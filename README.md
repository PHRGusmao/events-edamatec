# EventsEdamatec

🎉 **EventsEdamatec** é um projeto que consiste em um **Front-end** desenvolvido com **Angular** e um **Back-end** desenvolvido com **Node.js** e **Express**. O sistema foi projetado para gerenciar tarefas e eventos de maneira prática e intuitiva.

---

## 🛠️ **Pré-requisitos**

Antes de começar, certifique-se de que você tem as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/) - Para rodar o Back-end e as dependências do Front-end.
- [Angular CLI](https://angular.io/cli) - Para compilar e rodar o Front-end.
  
## ⚡ **Instalação**

### 1. **Instalar o Node.js**

Baixe e instale o Node.js na versão mais recente diretamente do [site oficial do Node.js](https://nodejs.org/). Durante a instalação, o **npm** (Node Package Manager) será automaticamente instalado.

### 2. **Instalar o Angular CLI**

Para rodar o Front-end, você precisa ter o **Angular CLI** instalado globalmente. Para isso, basta executar o seguinte comando:

```bash
npm install -g @angular/cli
```

### 3. **Instalar Dependências do Projeto**

Clone o repositório do projeto:

```bash
git clone https://github.com/PHRGusmao/events-edamatec.git
```

Acesse a pasta do projeto e instale as dependências:
```bash
cd events-edamatec
```
```bash
npm install
```

## 🚀 **Executando o Projeto**

### 1. **Rodar o Back-end (Node.js + Express)**

O Back-end foi desenvolvido utilizando Node.js com o framework Express. Siga os passos abaixo para rodá-lo:
- Clone o repositório do Back-end (caso ainda não tenha feito):

```bash
git clone https://github.com/PHRGusmao/task-manager-backend.git
```

- Acesse o diretório do Back-end:
  
```bash
cd task-manager-backend
```

- Instale as dependências do Back-end:
  
```bash
npm install
```

- Inicie o servidor do Back-end::
  
```bash
npm start
```

O servidor estará rodando na porta padrão do Node.js: http://localhost:8080.

### 2. **Rodar o Front-end (Angular)**
No diretório do Front-end (onde você já instalou as dependências):
```bash
ng serve
```
Isso iniciará o servidor Angular na porta http://localhost:4200. O navegador abrirá automaticamente essa URL ou você pode acessá-la manualmente.

## 🔧 **Dependências Especiais**

Este projeto utiliza as bibliotecas ngx-toastr e @angular/animations para exibir notificações e animar transições de elementos.

### **Instalação de ngx-toastr (Notificações)**
Para adicionar as notificações, o projeto utiliza a biblioteca ngx-toastr. Para instalá-la, use o seguinte comando:
```bash
npm install ngx-toastr --save
```
Font: [ngx-toastr - NPM](https://www.npmjs.com/package/ngx-toastr)

### **Instalação de @angular/animations (Animações)**
O Angular também utiliza @angular/animations para animações do front-end. Para garantir que as animações funcionem corretamente, instale a dependência com:
```bash
npm install @angular/animations --save
```

## 🔄 **Configuração de Portas**

- O Back-end está configurado para rodar na porta padrão do Node.js (http://localhost:8080).
- O Front-end está configurado para rodar na porta padrão do Angular (http://localhost:4200).

Ambos funcionam de maneira independente, sendo o Angular responsável pela interface e o Node.js pelo gerenciamento dos dados e rotas de API.

## 🧑‍💻 **Documentação Adicional**

Para mais detalhes sobre o Back-end (Node.js + Express), acesse o repositório completo:

[Task Manager Backend - GitHub](https://github.com/PHRGusmao/task-manager-backend)

## 🎯 **Contribuições**

Sinta-se à vontade para contribuir para o projeto! Para contribuir, basta:

- Fazer um fork do repositório.
- Criar uma branch com a sua feature ou correção.
- Fazer o commit e enviar um pull request.

## 🎉 **Conclusão**

Agora que o ambiente está configurado, você pode começar a desenvolver e testar o sistema. 🖥️
- Frontend: Angular 🚀
- Backend: Node.js + Express 🌐

Divirta-se desenvolvendo e contribuindo para o EventsEdamatec! 🎉
