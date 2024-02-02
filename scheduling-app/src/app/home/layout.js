

export const metadata = {
    title: 'Scheduling App'
}

export default function HomeLayout({
    children,
}) {
    return(
        <section>
            {/* Include UI here e.g. headers and navbars */}
            <nav></nav>
            {children}
        </section>
    )
}