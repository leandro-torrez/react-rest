import { fireEvent, render, screen, waitForElementToBeRemoved } from "@testing-library/react"
import AddUserList from "./AddUserList"
import axios from "axios"
import { customRender } from "../../utils/customRender"
jest.mock('axios')


const users = [{
  name: 'Pitang',
  email: 'contato@pitang.com',
  id: 1,
},
{
  name: 'Treiamento de estagio',
  email: 'treinamento@pitang.com',
  id: 2
}]

describe('<AddUserList />', () => {
  it('should show title ', async () => {
    axios.get.mockResolvedValueOnce({ data: users, loading: true, error: null });
    customRender(<AddUserList />)
    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i))
    const title = screen.getByRole('heading', { name: /Lista de usuários/i });
    expect(title).toBeInTheDocument();
  })
  it('should return list of user', async () => {
    axios.get.mockResolvedValueOnce({ data: users, loading: true, error: null });
    customRender(<AddUserList />)
    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i))
    expect(screen.getByText("Nome: Pitang")).toBeInTheDocument()
    expect(screen.getByText("Nome: Treiamento de estagio")).toBeInTheDocument()
  })

  it('should return error', async () => {
    axios.get.mockRejectedValueOnce(
      {
        data: [], loading: false, error: {
          response: {
            status: 500,
            message: 'erro no servidor'
          }
        }
      }
    );
    customRender(<AddUserList />)
    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i))
    expect(screen.getByText(/error/)).toBeInTheDocument()
  })

  it('should add new user ', async () => {
    axios.get.mockResolvedValueOnce({ data: users, loading: true, error: null });
    customRender(<AddUserList />)
    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i))

    const inputName = screen.getByRole('textbox', { name: /name/i })
    const inputEmail = screen.getByRole('textbox', { name: /email/i })
    const button = screen.getByRole('button', { name: /Adicionar/i })

    fireEvent.change(inputName, { target: { value: 'Leandro Junior' } })
    fireEvent.change(inputEmail, { target: { value: 'leandro.pitang' } })
    fireEvent.click(button);
    expect(screen.queryByText(/loading/i)).toBeNull()

    const newUser = await screen.findByText(/Leandro Junior/i)
    const newEmail = await screen.findByText(/leandro.pitang/i)

    expect(newUser).toBeInTheDocument();
    expect(newEmail).toBeInTheDocument();
    
    const messageSuccess = await screen.findByText(/usuário adicionado com sucesso/i)
    expect(messageSuccess).toBeInTheDocument();

    screen.debug();
  })

  it('should return form erros ', async () => {
    axios.get.mockResolvedValueOnce({ data: users, loading: true, error: null });
    customRender(<AddUserList />)
    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i))
    const button = screen.getByRole('button', { name: /Adicionar/i })

    fireEvent.click(button);
    expect(screen.queryByText(/loading/i)).toBeNull()
    const errorInput = await screen.findByText(/O nome é obrigatório/i)
    const errorInputEmail = await screen.findByText(/O email é obrigatório/i)
    expect(errorInput).toBeInTheDocument();
    expect(errorInputEmail).toBeInTheDocument();
  })
})