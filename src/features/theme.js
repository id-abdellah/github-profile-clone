let savedTheme = localStorage.getItem("gitCloneTheme");

if (savedTheme) {
    document.body.setAttribute("theme", localStorage.getItem("gitCloneTheme"))
}

export function themeToggle() {
    const body = document.body;
    const currentTheme = body.getAttribute("theme");

    if (currentTheme === "dark") {
        body.setAttribute("theme", "light")
    } else {
        body.setAttribute("theme", "dark")
    }
    localStorage.setItem("gitCloneTheme", getCurrentTheme())
}

export function getCurrentTheme() {
    return document.body.getAttribute("theme")
}