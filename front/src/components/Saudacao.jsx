function Saudacao({nome}){
    function gerarSaudacao(algumnome){
        return `Olá ${algumnome}, tudo bem?`
    }
    return( 
    <>
    {nome && gerarSaudacao(nome)}
    </>)
}
export default Saudacao