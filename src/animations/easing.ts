/** Shared easing curves so Motion and CSS animations feel like one system. */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const
export const easeOutQuart = [0.25, 1, 0.5, 1] as const
export const easeInOutQuint = [0.83, 0, 0.17, 1] as const

/** Viewport settings for scroll-triggered reveals. */
export const revealViewport = { once: true, margin: '0px 0px -12% 0px' } as const
