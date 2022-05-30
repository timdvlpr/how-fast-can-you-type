<template>
  <header>
    <h1>How fast can you type?</h1>
    <nav>
      <ul>
        <li>
          <RouterLink to="/">
            <font-awesome-icon icon="keyboard" />
            Type
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/highscores">
            <font-awesome-icon icon="star" />
            Highscores
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped lang="scss">
header {
  background: $dark;
  border-bottom: 2px solid $shade;
  padding: 5rem 0;
  text-align: center;
  h1 {
    text-transform: uppercase;
    position: relative;
    display: inline-block;
    &:after {
      content: "|";
      position: absolute;
      top: -0.1rem;
      right: -1rem;
      opacity: 25%;
      animation: 1s fadeInOut infinite;
    }
  }
  nav {
    margin-top: 2rem;
    ul {
      @include flex-center;
      padding: 0;
      li {
        a {
          border: 2px solid $shade;
          background: $dark;
          margin: 0.25rem 0.5rem;
          padding: 0.5rem 2rem;
          border-radius: 1rem;
          transition: 0.25s;
          &:hover {
            background: $accent;
          }
        }
      }
    }
  }
}
@keyframes fadeInOut {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
  }
}
</style>
