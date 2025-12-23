<template>
  <section class="legal-page">
    <div class="container">
      <h1>使用條款（Terms of Service）</h1>
      <div class="meta-info">
        更新日期：2025/01/01 &nbsp;|&nbsp; 適用網站：
        <a href="https://71bk.dev" target="_blank" rel="noreferrer">71BK (https://71bk.dev)</a>
      </div>

      <p>歡迎使用 71BK（以下稱「本網站」）。為確保服務品質並保護雙方權益，請仔細閱讀本使用條款。使用本網站即表示您同意本條款之全部內容。</p>

      <h2>一、服務說明（Service Description）</h2>
      <p>本網站為個人作品集、後台管理與整合第三方服務（如 LINE Bot API）之非商業用途網站。本網站不提供交易、金流或廣告等商業功能。</p>

      <h2>二、使用者義務（User Obligations）</h2>
      <p>使用本網站時，您同意：</p>
      <ul>
        <li>不得從事任何非法行為。</li>
        <li>不得破壞、入侵或干擾網站系統運作。</li>
        <li>不得嘗試未經授權存取後端資料或功能。</li>
        <li>不得利用本網站發送垃圾訊息或惡意內容。</li>
      </ul>

      <h2>三、智慧財產權（Intellectual Property Rights）</h2>
      <p>本網站內容（包含程式碼、介面、著作、圖片）皆屬 71BK 所有。未經授權不得複製、重製、修改或散佈。</p>

      <h2>四、第三方服務（Third-Party Services）</h2>
      <p>本網站可能整合第三方平台，如：</p>
      <ul>
        <li>LINE Messaging API</li>
        <li>Google OAuth（若有）</li>
      </ul>
      <p>您使用第三方服務時，亦須遵守該平台的使用條款。</p>

      <h2>五、免責聲明（Disclaimer）</h2>
      <ul>
        <li>本網站為個人開發展示用途，不保證完全不中斷或無錯誤。</li>
        <li>本網站對於使用者因使用本服務所造成之任何損害不負任何賠償責任。</li>
        <li>第三方服務之任何變更、錯誤或中斷，本站亦不負責。</li>
      </ul>

      <h2>六、帳號與資料安全（Account & Data Security）</h2>
      <p>如本網站提供登入功能，您須負責：</p>
      <ul>
        <li>帳號與密碼的保管</li>
        <li>不得將帳號轉借予他人</li>
        <li>若發生外洩風險請立即通知我們</li>
      </ul>

      <h2>七、條款變更（Changes to Terms）</h2>
      <p>我們會視情況調整本條款，更新後將公布於本頁面。</p>

      <h2>八、聯絡方式（Contact Information）</h2>
      <p>如有任何條款相關疑問，請聯絡：<br />
      Email：<a href="mailto:kiwihsu828@gmail.com">kiwihsu828@gmail.com</a></p>
    </div>
  </section>
</template>

<style scoped>
.legal-page {
  font-family: "Helvetica Neue", Helvetica, Arial, "PingFang TC", "Heiti TC", "Microsoft JhengHei", sans-serif;
  line-height: 1.8;
  color: #4a4a4a;
  background-color: #f9f9f9;
  min-height: 100vh;
  padding: 40px 20px;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  background-color: #ffffff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

h1 {
  font-size: 24px;
  font-weight: 500;
  color: #333;
  margin-bottom: 10px;
  text-align: center;
  letter-spacing: 1px;
}

.meta-info {
  text-align: center;
  font-size: 14px;
  color: #888;
  margin-bottom: 40px;
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
}

h2 {
  font-size: 18px;
  color: #2c3e50;
  margin-top: 30px;
  margin-bottom: 15px;
  border-left: 4px solid #aa96da;
  padding-left: 10px;
}

p {
  margin-bottom: 15px;
  text-align: justify;
}

ul {
  margin-bottom: 20px;
  padding-left: 20px;
}

li {
  margin-bottom: 8px;
}

a {
  color: #6699cc;
  text-decoration: none;
  transition: color 0.3s;
}

a:hover {
  color: #4a7a9f;
}
</style>
