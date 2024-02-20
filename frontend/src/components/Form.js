import React, {useRef, useEffect} from "react";
import styled from "styled-components";
import axios from "axios";
import {toast} from "react-toastify"

const FormContainer = styled.form`
    background-color #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    gap: 10px;
`;

const Input = styled.input`
    width: 120px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const Button = styled.button`
    cursor: pointer;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #2c73d2;
    color: white;
    height: 42px;
`;

const Label = styled.label``;

const Form = ({onEdit, setOnEdit, getUsers}) => {
    const ref = useRef();

    useEffect(() => {
        if(onEdit) {
            const user = ref.current;

            user.nome.value = onEdit.nome;
            user.email.value = onEdit.email;
            user.fone.value = onEdit.fone;
            user.nascimento.value = onEdit.nascimento;
        }
    }, [onEdit])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = ref.current;

        if (
            !user.nome.value ||
            !user.email.value ||
            !user.fone.value ||
            !user.nascimento.value
        ) {
            return toast.warn("Preencha todos os campos!")
        }

        if(onEdit) {
            await axios
                .put("http://localhost:8800/" + onEdit.idusuarios, {
                    nome: user.nome.value,
                    email: user.email.value,
                    fone: user.fone.value,
                    nascimento: user.nascimento.value,
                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data))
        } else {
            await axios
            .post("http://localhost:8800", {
                nome: user.nome.value,
                email: user.email.value,
                fone: user.fone.value,
                nascimento: user.nascimento.value,
            })
            .then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data))
        }

        user.nome.value = "";
        user.email.value = "";
        user.fone.value = "";
        user.nascimento.value = "";

        setOnEdit(null);
        getUsers();
    }

    return(
        <FormContainer ref={ref} onSubmit={handleSubmit}> 
            <InputArea>
             <Label>Nome</Label>
             <Input name = "nome"/>
            </InputArea>
            <InputArea>
             <Label>Email</Label>
             <Input name = "email" type="email"/>
            </InputArea>
            <InputArea>
             <Label>Telefone</Label>
             <Input name = "fone" />
            </InputArea>
            <InputArea>
             <Label>Data de Nascimento</Label>
             <Input name = "nascimento" type="date"/>
            </InputArea>
            <Button type="submit">SALVAR</Button>
        </FormContainer>
    );
}

export default Form;