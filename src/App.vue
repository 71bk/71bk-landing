<template>
  <div class="app-shell">
    <header class="site-header">
      <RouterLink class="brand" to="/">71BK</RouterLink>
      <nav class="site-nav">
        <RouterLink to="/projects">Projects</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
      <button class="chat-trigger" type="button">Chat</button>
    </header>
    <main class="site-main">
      <RouterView />
    </main>
  </div>
</template>
