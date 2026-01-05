/**
 * useMarkdown Composable
 * 
 * 共用的 Markdown 轉 HTML 渲染函式
 * 前台與後台都使用此 composable 確保渲染結果一致
 */

/**
 * 將 Markdown 文字轉換為 HTML
 * 支援：標題、列表、粗體、斜體、程式碼、引言、連結、分隔線
 * 
 * @param {string} markdown - Markdown 原始文字
 * @returns {string} - 轉換後的 HTML
 */
function markdownToHtml(markdown) {
  if (!markdown) return ''

  let html = markdown
    // 先處理程式碼區塊（防止內部被其他規則影響）
    .replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
      return `<pre><code class="language-${lang || 'plaintext'}">${escapeHtml(code.trim())}</code></pre>`
    })
    // 行內程式碼
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // 標題 (h1 - h4)
    .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // 水平分隔線
    .replace(/^---$/gm, '<hr />')
    .replace(/^\*\*\*$/gm, '<hr />')
    // 引言區塊
    .replace(/^> (.+)$/gm, '<blockquote><p>$1</p></blockquote>')
    // 粗體 + 斜體
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    // 粗體
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.+?)__/g, '<strong>$1</strong>')
    // 斜體
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/_(.+?)_/g, '<em>$1</em>')
    // 圖片（放在連結前，因為圖片語法包含 ! 前綴）
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy" />')
    // 連結
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')

  // 處理無序列表
  html = processUnorderedLists(html)
  // 處理有序列表
  html = processOrderedLists(html)
  // 處理段落
  html = processParagraphs(html)

  return html
}

/**
 * 處理無序列表 (- item)
 */
function processUnorderedLists(html) {
  const lines = html.split('\n')
  let result = []
  let inList = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const listMatch = line.match(/^- (.+)$/)

    if (listMatch) {
      if (!inList) {
        result.push('<ul>')
        inList = true
      }
      result.push(`<li>${listMatch[1]}</li>`)
    } else {
      if (inList) {
        result.push('</ul>')
        inList = false
      }
      result.push(line)
    }
  }

  if (inList) {
    result.push('</ul>')
  }

  return result.join('\n')
}

/**
 * 處理有序列表 (1. item)
 */
function processOrderedLists(html) {
  const lines = html.split('\n')
  let result = []
  let inList = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const listMatch = line.match(/^\d+\. (.+)$/)

    if (listMatch) {
      if (!inList) {
        result.push('<ol>')
        inList = true
      }
      result.push(`<li>${listMatch[1]}</li>`)
    } else {
      if (inList) {
        result.push('</ol>')
        inList = false
      }
      result.push(line)
    }
  }

  if (inList) {
    result.push('</ol>')
  }

  return result.join('\n')
}

/**
 * 處理段落：將連續的非 HTML 標籤文字包在 <p> 中
 */
function processParagraphs(html) {
  const lines = html.split('\n')
  let result = []
  let paragraphLines = []

  const blockTags = ['<h1>', '<h2>', '<h3>', '<h4>', '<ul>', '</ul>', '<ol>', '</ol>', 
                     '<li>', '</li>', '<pre>', '</pre>', '<blockquote>', '</blockquote>',
                     '<hr', '<img']

  function isBlockElement(line) {
    return blockTags.some(tag => line.trim().startsWith(tag))
  }

  function flushParagraph() {
    if (paragraphLines.length > 0) {
      const text = paragraphLines.join(' ').trim()
      if (text) {
        result.push(`<p>${text}</p>`)
      }
      paragraphLines = []
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()

    if (trimmed === '') {
      flushParagraph()
    } else if (isBlockElement(line)) {
      flushParagraph()
      result.push(line)
    } else {
      paragraphLines.push(trimmed)
    }
  }

  flushParagraph()

  return result.join('\n')
}

/**
 * HTML 特殊字元跳脫
 */
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return text.replace(/[&<>"']/g, (char) => map[char])
}

/**
 * useMarkdown composable
 */
export function useMarkdown() {
  /**
   * 渲染 Markdown 為 HTML
   * @param {string} markdown - Markdown 文字
   * @returns {string} - HTML 字串
   */
  const renderMarkdown = (markdown) => {
    return markdownToHtml(markdown)
  }

  return {
    renderMarkdown
  }
}

export default useMarkdown
