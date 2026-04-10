function Lista({itens}) {
    return(
        <>
        <h3>Lista de Frameworks</h3>
        {
            itens.map((item, index) => (
                <p key={index}>{item}</p>
            ))
        }
        </>
    )
}

export default Lista