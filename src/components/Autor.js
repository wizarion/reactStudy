import React, { Component } from 'react'
import InputCustom from './InputCustom'
import SubmitButton from './SubmitButton'
import PubSub from 'pubsub-js'

class FormularioAutor extends Component {
    
    constructor() {
        super();
        this.state = {
          nome: '',
          email: '',
          senha: ''
        };
        this.url = 'http://cdc-react.herokuapp.com/api/autores';
        this.sendAutores = this.sendAutores.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
      }

    sendAutores(evento) {
    
        evento.preventDefault();

        return fetch(this.url, {
            headers: { 'Content-type': 'application/json' },
            method: 'post',
            body: JSON.stringify({nome: this.state.nome, email: this.state.email, senha: this.state.senha})
        })
        .then(PubSub.publish('atualiza-lista-autores', true))
    }
  
    setNome(event) {
      this.setState({nome: event.target.value})
    }
  
    setEmail(event) {
      this.setState({email: event.target.value})
    }
  
    setSenha(event) {
      this.setState({senha: event.target.value})
    }

    render() {
        return(
          <div style={{ 'marginTop': '25px' }}>
              <form className="pure-form pure-form-aligned pure-g" onSubmit={this.sendAutores} method="post">
                  <InputCustom id="nome" type="text" value={this.state.nome} onChange={this.setNome} label="Nome"/>
                  <InputCustom id="email" type="email" value={this.state.email} onChange={this.setEmail} label="Email"/>
                  <InputCustom id="senha" type="password" value={this.state.senha} onChange={this.setSenha} label="Senha"/>
                  <SubmitButton name="Salvar" />
              </form>
          </div>
        );
    }
}

class TabelaAutores extends Component {

    render() {
        return(
            <div style={{ 'margin': '50px 0 0 120px' }}>
                <table className="pure-table">
                <thead>
                    <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    </tr>
                </thead>

                <tbody>

                    {
                    this.props.lista.map(autor => {
                        return (
                        <tr key={autor.id}>
                            <td>{autor.nome}</td>
                            <td>{autor.email}</td>
                        </tr>
                        );
                    })
                    }
                </tbody>
                </table>
            </div>
        );
    }
}

export default class AutorBox extends Component {

    constructor() {
        super();
        this.state = {lista: []};
        this.url = 'http://cdc-react.herokuapp.com/api/autores';
    }
    
    componentDidMount() {
        this.getAutores();

        PubSub.subscribe('atualiza-lista-autores', (topico, cadastrou) => {
            if(cadastrou){
                alert('Cadastrado com sucesso')
                this.getAutores();
            }
        })
    }

    getAutores() {

        return fetch(this.url)
        .then(res => res.json())
        .then(autores => {

            let novaLista = []
            for (let i = 0; i < 10; i++) {
                novaLista.push(autores.pop())
            }

            this.setState({ lista: novaLista })
            })
        .catch(err => {
        throw new Error(`Deu ruim: ${err}`)
        })
    }

    render() {
        return(
            <div>
                <FormularioAutor/>
                <TabelaAutores lista={this.state.lista}/>
            </div>
        );
    }
}