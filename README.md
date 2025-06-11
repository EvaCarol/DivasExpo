## 🎤 Meu Primeiro App React Native – Divas Pop dos Anos 2000

Este é um aplicativo desenvolvido com **React Native + Expo** como atividade prática da disciplina de **Desenvolvimento Mobile**, cujo objetivo era criar um app funcional com armazenamento local, consumo de API e interface customizada.

> Projeto desenvolvido por **Evellyn Carolyne Gomes da Silva** – 2025

---

### ✨ Funcionalidades implementadas

| Funcionalidade          | Descrição                                               | Status                            |
| ----------------------- | ------------------------------------------------------- | --------------------------------- |
| 📃 Listagem de itens    | Lista de divas exibidas com nome, imagem e descrição    | ✅                                 |
| ➕ Cadastro de novo item | Formulário para adicionar uma nova diva à lista         | ✅                                 |
| ✏️ Edição de item       | É possível editar qualquer diva já cadastrada           | ✅                                 |
| ❌ Exclusão de item      | Cada diva pode ser removida da lista                    | ✅                                 |
| 💾 Armazenamento local  | Uso do `AsyncStorage` para persistir os dados           | ✅                                 |
| 🌐 Consumo de API       | Integração com API externa (Render) para carregar divas | ✅                                 |
| 🎨 Interface estilizada | Layout personalizado com imagem, botões e rolagem       | ✅                                 |

---

### 🧠 Tecnologias utilizadas

* [React Native](https://reactnative.dev/)
* [Expo](https://expo.dev/)
* [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
* [JavaScript (ES6+)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
* API hospedada no [Render](https://render.com/) *(para carregamento de dados)*

---

### 📱 Como executar o app

1. Acesse o projeto no **[Expo Snack](https://snack.expo.dev/)** (caso esteja usando web)
2. Ou clone o repositório e execute localmente:

   ```bash
   git clone https://github.com/seu-usuario/seu-repo.git
   cd seu-repo
   npm install
   npx expo start
   ```

> ⚠️ Para visualizar o app em um dispositivo físico, use o app do **Expo Go** disponível na Play Store/App Store.

---

### 📸 Capturas de tela (opcional)

![image](https://github.com/user-attachments/assets/e93caa94-79d3-400a-a719-a12e0a1c0541)

![image](https://github.com/user-attachments/assets/8f7299e1-f28b-4267-a3e5-077605fed7c9)



---

### 🚀 Melhorias futuras

* Tratar erros de conexão com API (offline fallback)
* Permitir upload de imagem personalizada
* Implementar busca e filtros por nome
* Substituir Render por uma hospedagem mais estável (ex: Cyclic)

