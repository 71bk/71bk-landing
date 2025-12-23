-- =========================================
-- Portfolio CMS + LINE Admin System
-- MySQL Schema v2 (Complete with Analytics & AI Search)
-- Engine: InnoDB | Charset: utf8mb4
-- Updated: 2025-12-23
-- =========================================
-- ⚠️ 警告：此腳本會刪除並重建整個資料庫，所有資料將會遺失！
-- =========================================

-- 刪除現有資料庫（如果存在）
DROP DATABASE IF EXISTS landing;

-- 建立新資料庫
CREATE DATABASE landing
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE landing;

-- -----------------------------------------
-- 1) Admin Users (後台管理者 - LINE Login)
-- -----------------------------------------
CREATE TABLE IF NOT EXISTS admin_users (
  id              BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主鍵 ID',
  line_user_id    VARCHAR(64)     NOT NULL COMMENT 'LINE 平台的 User ID（唯一識別）',
  display_name    VARCHAR(100)    NULL COMMENT '顯示名稱（來自 LINE Profile）',
  picture_url     VARCHAR(500)    NULL COMMENT '頭像 URL（來自 LINE Profile）',
  role            ENUM('ADMIN')   NOT NULL DEFAULT 'ADMIN' COMMENT '角色（目前僅 ADMIN）',
  created_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '建立時間',
  updated_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新時間',
  PRIMARY KEY (id),
  UNIQUE KEY uk_admin_users_line_user_id (line_user_id),
  KEY idx_admin_users_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='後台管理者帳號（透過 LINE Login 認證）';

-- -----------------------------------------
-- 2) LINE Users (LINE Bot 用戶/追蹤者)
-- -----------------------------------------
CREATE TABLE IF NOT EXISTS line_users (
  id              BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主鍵 ID',
  line_user_id    VARCHAR(64)     NOT NULL COMMENT 'LINE 平台的 User ID（唯一識別）',
  display_name    VARCHAR(100)    NULL COMMENT '顯示名稱（來自 LINE Profile）',
  picture_url     VARCHAR(500)    NULL COMMENT '頭像 URL（來自 LINE Profile）',
  last_seen_at    TIMESTAMP       NULL COMMENT '最後互動時間',
  created_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '建立時間（首次互動）',
  updated_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新時間',
  PRIMARY KEY (id),
  UNIQUE KEY uk_line_users_line_user_id (line_user_id),
  KEY idx_line_users_last_seen_at (last_seen_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='LINE Bot 用戶（追蹤者/互動者）';

-- -----------------------------------------
-- 3) LINE Message Logs (訊息紀錄：INBOUND/OUTBOUND)
--    - event_id: 冪等性 key（INBOUND 用）
--    - 也作為 OUTBOUND 的 request_id
-- -----------------------------------------
CREATE TABLE IF NOT EXISTS line_message_logs (
  id                BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主鍵 ID',
  event_id          VARCHAR(128)    NOT NULL COMMENT '事件 ID（INBOUND 用於冪等性檢查，OUTBOUND 用於追蹤）',
  direction         ENUM('INBOUND','OUTBOUND') NOT NULL COMMENT '訊息方向：INBOUND=收到的訊息，OUTBOUND=發出的訊息',
  line_user_id      VARCHAR(64)     NULL COMMENT '關聯的 LINE User ID',
  message_type      VARCHAR(30)     NULL COMMENT '訊息類型：text/image/sticker/audio/video/location/flex 等',
  message_text      TEXT            NULL COMMENT '文字訊息內容（僅 text 類型有值）',
  payload_json      JSON            NOT NULL COMMENT '原始 JSON payload（完整保留供除錯）',
  status            ENUM('RECEIVED','SENT','FAILED') NOT NULL COMMENT '狀態：RECEIVED=已收到，SENT=已發送，FAILED=發送失敗',
  line_api_response JSON            NULL COMMENT 'LINE API 回應（OUTBOUND 發送後的回應）',
  created_at        TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '建立時間',
  PRIMARY KEY (id),
  UNIQUE KEY uk_line_message_logs_event_id (event_id),
  KEY idx_line_message_logs_user_time (line_user_id, created_at),
  KEY idx_line_message_logs_direction_time (direction, created_at),
  CONSTRAINT fk_line_message_logs_line_user_id
    FOREIGN KEY (line_user_id) REFERENCES line_users (line_user_id)
    ON UPDATE CASCADE
    ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='LINE 訊息紀錄（進出雙向，含冪等性控制）';

-- -----------------------------------------
-- 4) Portfolio Projects (作品集核心資料)
--    v2: 新增 category, scores, search_text 支援 AI 搜尋
--    v2: 移除 demo_url/repo_url（改用 project_links 表）
-- -----------------------------------------
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id               BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主鍵 ID',
  title            VARCHAR(200)    NOT NULL COMMENT '作品標題',
  slug             VARCHAR(220)    NOT NULL COMMENT '網址用 slug（如 /projects/my-project）',
  summary          VARCHAR(500)    NULL COMMENT '作品摘要（用於列表頁顯示）',
  content_md       LONGTEXT        NULL COMMENT '作品內容（Markdown 格式，Case Study 詳情）',
  cover_image_url  VARCHAR(500)    NULL COMMENT '封面圖片 URL',

  -- 狀態與顯示控制
  status           ENUM('DRAFT','PUBLISHED','ARCHIVED') NOT NULL DEFAULT 'DRAFT' COMMENT '發布狀態：DRAFT=草稿，PUBLISHED=已發布，ARCHIVED=已封存',
  featured         TINYINT(1)      NOT NULL DEFAULT 0 COMMENT '是否為精選作品（1=精選，0=一般）',
  sort_order       INT             NOT NULL DEFAULT 0 COMMENT '排序順序（數字越小越前面）',
  published_at     TIMESTAMP       NULL COMMENT '發布時間（首次設為 PUBLISHED 的時間）',

  -- AI/搜尋欄位（v2 新增）
  category         ENUM('SYSTEM','FRONTEND','BACKEND','TOOL') NULL COMMENT '作品分類：SYSTEM=系統整合，FRONTEND=前端，BACKEND=後端，TOOL=工具',
  difficulty_score TINYINT         NULL COMMENT '難度評分（1-5，自評）',
  impact_score     TINYINT         NULL COMMENT '影響力評分（1-5，自評）',
  search_text      LONGTEXT        NULL COMMENT '搜尋用聚合文字（title+summary+content+techs，用於 FULLTEXT）',

  created_at       TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '建立時間',
  updated_at       TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新時間',

  PRIMARY KEY (id),
  UNIQUE KEY uk_portfolio_projects_slug (slug),
  KEY idx_portfolio_projects_status_featured_sort (status, featured, sort_order),
  KEY idx_portfolio_projects_published_at (published_at),
  KEY idx_portfolio_projects_category (category),
  FULLTEXT KEY ft_portfolio_projects_search (search_text)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='作品集項目（含 AI 搜尋欄位）';

-- -----------------------------------------
-- 5) Project Links (作品外部連結)
--    v2 新增：Demo/GitHub/Docs/Blog 等連結
-- -----------------------------------------
CREATE TABLE IF NOT EXISTS project_links (
  id              BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主鍵 ID',
  project_id      BIGINT UNSIGNED NOT NULL COMMENT '關聯的作品 ID',
  type            ENUM('DEMO','GITHUB','DOC','BLOG','OTHER') NOT NULL COMMENT '連結類型：DEMO=線上展示，GITHUB=原始碼，DOC=文件，BLOG=部落格文章，OTHER=其他',
  url             VARCHAR(500)    NOT NULL COMMENT '連結 URL',
  label           VARCHAR(100)    NULL COMMENT '顯示文字（如「查看 Demo」）',
  sort_order      INT             NOT NULL DEFAULT 0 COMMENT '排序順序（數字越小越前面）',
  created_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '建立時間',
  updated_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新時間',
  PRIMARY KEY (id),
  KEY idx_project_links_project_id (project_id),
  KEY idx_project_links_type (type),
  CONSTRAINT fk_project_links_project_id
    FOREIGN KEY (project_id) REFERENCES portfolio_projects (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='作品外部連結（Demo/GitHub/Docs 等）';

-- -----------------------------------------
-- 6) Portfolio Techs (技術標籤)
-- -----------------------------------------
CREATE TABLE IF NOT EXISTS portfolio_techs (
  id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主鍵 ID',
  name        VARCHAR(80)     NOT NULL COMMENT '技術名稱（如 Vue、Spring Boot、Docker）',
  created_at  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '建立時間',
  PRIMARY KEY (id),
  UNIQUE KEY uk_portfolio_techs_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='技術標籤（用於作品篩選）';

-- -----------------------------------------
-- 7) Portfolio Project Techs (作品-技術 多對多關聯)
-- -----------------------------------------
CREATE TABLE IF NOT EXISTS portfolio_project_techs (
  project_id  BIGINT UNSIGNED NOT NULL COMMENT '作品 ID',
  tech_id     BIGINT UNSIGNED NOT NULL COMMENT '技術 ID',
  created_at  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '建立時間',
  PRIMARY KEY (project_id, tech_id),
  KEY idx_project_techs_tech_id (tech_id),
  CONSTRAINT fk_project_techs_project_id
    FOREIGN KEY (project_id) REFERENCES portfolio_projects (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT fk_project_techs_tech_id
    FOREIGN KEY (tech_id) REFERENCES portfolio_techs (id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='作品與技術標籤的多對多關聯';

-- -----------------------------------------
-- 8) Analytics Events (訪客行為事件追蹤)
--    v2 新增：用於統計 PV、點擊、搜尋等
-- -----------------------------------------
CREATE TABLE IF NOT EXISTS analytics_events (
  id              BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主鍵 ID',
  event_type      ENUM('PAGE_VIEW','PROJECT_VIEW','LINK_CLICK','SEARCH','CHAT_QUERY') NOT NULL COMMENT '事件類型：PAGE_VIEW=頁面瀏覽，PROJECT_VIEW=作品瀏覽，LINK_CLICK=連結點擊，SEARCH=搜尋，CHAT_QUERY=AI 聊天',
  project_id      BIGINT UNSIGNED NULL COMMENT '關聯的作品 ID（若為作品相關事件）',
  link_id         BIGINT UNSIGNED NULL COMMENT '關聯的連結 ID（若為 LINK_CLICK 事件）',
  path            VARCHAR(500)    NULL COMMENT '當前頁面路徑（如 /projects/my-project）',
  referrer        VARCHAR(500)    NULL COMMENT '來源頁面 URL',
  session_id      VARCHAR(100)    NULL COMMENT '匿名 Session ID（用於識別同一訪客）',
  meta_json       JSON            NULL COMMENT '額外資料（如搜尋關鍵字、篩選條件等）',
  created_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '事件發生時間',
  PRIMARY KEY (id),
  KEY idx_analytics_events_type_time (event_type, created_at),
  KEY idx_analytics_events_project_id (project_id),
  KEY idx_analytics_events_link_id (link_id),
  KEY idx_analytics_events_session_id (session_id),
  KEY idx_analytics_events_created_at (created_at),
  CONSTRAINT fk_analytics_events_project_id
    FOREIGN KEY (project_id) REFERENCES portfolio_projects (id)
    ON UPDATE CASCADE
    ON DELETE SET NULL,
  CONSTRAINT fk_analytics_events_link_id
    FOREIGN KEY (link_id) REFERENCES project_links (id)
    ON UPDATE CASCADE
    ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='訪客行為事件（用於 Analytics Dashboard）';

-- =========================================
-- 資料表總覽 (v2)
-- =========================================
-- 1. admin_users          - 後台管理者帳號（LINE Login）
-- 2. line_users           - LINE Bot 用戶
-- 3. line_message_logs    - LINE 訊息紀錄（INBOUND/OUTBOUND）
-- 4. portfolio_projects   - 作品集項目（含 AI 搜尋欄位）
-- 5. project_links        - 作品外部連結（NEW in v2）
-- 6. portfolio_techs      - 技術標籤
-- 7. portfolio_project_techs - 作品-技術多對多關聯
-- 8. analytics_events     - 訪客行為事件追蹤（NEW in v2）
-- =========================================
