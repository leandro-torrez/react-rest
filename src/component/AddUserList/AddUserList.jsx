import axios from "axios";
import { useEffect, useState } from "react";
import "./AddUserList.css";
import { useForm } from "react-hook-form";
import { useModal } from "../../context/modalContext";
import Modal from "../modal/modal";
const AddUserList = () => {
  const {openModal} = useModal()
  const { handleSubmit, register, formState: {errors} } = useForm()
  const [users, setUsers] = useState({
    loading: true,
    error: null,
    data: [],
  });
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();
        setUsers((prev) => ({
          ...prev,
          data: data,
          loading: false,
        }));
      } catch (error) {
        setUsers((prev) => ({
          ...prev,
          data: [],
          loading: false,
          error: error,
        }));
      }
    };

    fetchUser();
  }, []);

  const adicionarUsuario = (data) => {
    setUsers((prev) => ({
      ...prev,
      data: [{
        name:  data.name,
        email: data.email,
        id: Math.floor(Math.random() * 100) * 350
      },...prev.data],
      loading: false,
    }));
    //mensagem sucesso
    openModal(<Modal message="usuário adicionado com sucesso" />)
  }

  if (users.loading) {
    return (
      <div className="box-user">
        <div className="loading">loading...</div>
      </div>
    );
  }

  if (users.error) {
    return <div className="box-user">error...</div>;
  }

  return (
    <div className="box-user">
      <h1>Lista de usuários</h1>
      <ul>
        {users &&
          users.data &&
          users.data.slice(0, 5).map((user) => (
            <li key={user.id}>
              <span>Nome: {user.name}</span> - <span>Email: {user.email}</span>
            </li>
          ))}
      </ul>

      <form onSubmit={handleSubmit(adicionarUsuario)}>
        <h2>Adicionar usuário</h2>
        <label>Nome</label>
        <input type="text" aria-label="name" {...register("name", {required: true})} />
        {errors && errors.name && (
          <div className="error">O nome é obrigatório</div>
        )}
        <br />
        <label>Email</label>
        <input type="text" aria-label="email" {...register("email", {required: true})}  />
        {errors && errors.email && (
          <div className="error">O email é obrigatório</div>
        )}
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
};

export default AddUserList;
