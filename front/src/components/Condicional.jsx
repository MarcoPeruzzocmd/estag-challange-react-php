import { useState } from 'react'
function Condicional() {
    function enviarEmail(e) {
        e.preventDefault()
        setUserEmail(email)
        console.log(userEmail)
    }
    function limparEmail() {
        setUserEmail("")
    }
    const [email, setEmail] = useState()
    const [userEmail, setUserEmail] = useState()
    return(
        <div>
            <h2>Cadastre o seu email</h2>
            <form action="">
                <input name="email" type="email" placeholder="Email" id="" onChange={(e) => setEmail(e.target.value)} />
            </form>
            <button onClick={enviarEmail}>Enviar email</button>
            {userEmail && (
                <div>
                    o email é: {userEmail}
                    <button onClick={limparEmail}>Limpar</button>
                </div>
            )}
        </div>
    )
}
export default Condicional