import {useState} from 'react'
import Button from './Button'
function Form() {
    function cadastrarUsuario(e) {
        e.preventDefault()
        console.log(`Usuario: ${name} Senha: ${password}`)
    }
    function segundoEvento(e){
        e.preventDefault()
        console.log("segundo evento")
    }
    const [name, setName] = useState()
    const [password, setPassword] = useState()
    return(
        <div>
            <h1>Meu cadastro</h1>
            <form action="" >
                <div>
                    <label htmlFor="name">Nome </label>
                    <input type="text" id="name" name="name" placeholder = "Digite seu nome" onChange={(e) => setName(e.target.value)} /> 
                </div>
                <div>
                    <label htmlFor="password">Senha </label>
                    <input type="password" name="password" id="password" placeholder="digite a senha" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <Button event={cadastrarUsuario} text="Primeiro evento"/>
                    <Button event={segundoEvento} text="segundo evento"/>
                    <input type="submit" onSubmit={cadastrarUsuario} value="Cadastrar" />
                </div>
            </form>
        </div>
    )
}
export default Form