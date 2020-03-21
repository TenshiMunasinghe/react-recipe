import React from "react"
import styled from "styled-components"

interface Props {
    handleSubmit: any
    handleChange: any
    search: string
}

const Search: React.FC<Props> = ({ handleSubmit, search, handleChange }) => {
    return (
        <Form onSubmit={handleSubmit}>
            <Input
                type='text'
                className='search__bar'
                value={search}
                onChange={handleChange}
                placeholder='type here'
            />
            <Button type='submit' className='search__btn'>
                Search
            </Button>
        </Form>
    )
}

const Form = styled.form`
    display: flex;
    min-height: 10vh;
    justify-content: center;
    align-items: center;
`

const Input = styled.input`
    width: 50%;
    border: none;
    padding: 0.5rem;
    font-size: 1rem;
    max-height: 100%;
`

const Button = styled.button`
    background: lightcoral;
    border: none;
    max-height: 100%;
    padding: 0.5rem 1rem;
    color: white;
    font-size: 1rem;
`

export default Search
