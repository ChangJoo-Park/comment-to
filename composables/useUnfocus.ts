export const useUnfocus = () => {
  const unfocus = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
  }

  return {
    unfocus
  }
}
