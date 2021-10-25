import React, { useState} from 'react';
import { Modal } from 'react-native'
import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { Container, FormView, Header, Title, Fields, TransactionView } from './styles';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { CategorySelect } from '../../screens/CategorySelect'


export function Register() {
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  })
  const [transactionType, setTransactionType] = useState('')
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)

  function handleTransactionTypeSelect(type: 'up' | "down") {
    setTransactionType(type);
  }

  function handleModalSelectCategoryModal() {
    setCategoryModalOpen(true)
  }

  function handleCloseSelectCategory() {
    setCategoryModalOpen(false)
  }

  return (
  <Container>
    <Header>
      <Title>Cadastro</Title>
    </Header>
    <FormView>
      <Fields>
      <Input
        placeholder="Nome"
      />
      <Input
        placeholder="Preço"
      />
      <TransactionView>
        <TransactionTypeButton
          type="up"
          title="Income"
          onPress={() => handleTransactionTypeSelect('up')}
          isActive={transactionType === 'up'}
          />
        <TransactionTypeButton
          type="down"
          title="Output"
          onPress={() => handleTransactionTypeSelect('down')}
          isActive={transactionType === 'down'}
          />
      </TransactionView>
      <CategorySelectButton title={category.name} onPress={handleModalSelectCategoryModal}/>
      </Fields>
      <Button title="Enviar" />
    </FormView>

    <Modal visible={categoryModalOpen}>
      <CategorySelect
        category={category}
        setCategory={setCategory}
        closeSelectCategory={handleCloseSelectCategory}
      />
    </Modal>
  </Container>
    );
}

export default Register;
