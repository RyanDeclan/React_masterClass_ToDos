import { customCategoryState, ICustomCategory } from "../atoms";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from  "styled-components";


const Form = styled.form`
    display:flex;
    input {
        height: 30px;
        width:110px;
        border: none;
        border-radius: 5px;
 
        padding: 0 10px;
    }
`;





interface SForm {
    customCategory: string;
}



function CreateCategory() {
    const setCustomCategory = useSetRecoilState(customCategoryState)
    const { register, handleSubmit, setValue } = useForm<SForm>();
    const onValid = ({ customCategory } : SForm) => {
        setCustomCategory((prevCategories) => [ {title:customCategory, id:Date.now()}, ...prevCategories,]);
        setValue("customCategory", "");
    };
    return(
        <Form onSubmit={handleSubmit(onValid)}>
            <input {...register("customCategory")} placeholder="새 카테고리 추가" />
            <button>Add</button>
        </Form>
    )
}

export default CreateCategory