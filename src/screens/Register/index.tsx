import React, { useState, useEffect, useCallback  } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import * as Yup from 'yup';
import { Button } from '../../components/Form/Button';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { InputForm } from '../../components/Form/InputForm';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelect } from '../../screens/CategorySelect';
import { Container, Fields, FormView, Header, Title, TransactionView } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { transactionKey } from '../../constants/storage';
import uuid from 'react-native-uuid'
import { useNavigation } from '@react-navigation/native';

interface IFormData {
  name: string,
  amount: number,
}

const schema = Yup.object().shape({
  name: Yup
    .string()
    .required('Nome é obrigatório'),
  amount: Yup
  .number()
  .typeError('Informe um valor numérico')
  .positive('O valor não pode ser negativo')
  .required('O valor é obrigatório'),
})

export function Register() {
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  })
  const { navigate } = useNavigation();
  const [transactionType, setTransactionType] = useState('')
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)
  const { control, handleSubmit, formState: { errors }, reset } = useForm({ resolver:  yupResolver(schema) });

  function handleTransactionTypeSelect(type: 'positive' | "negative") {
    setTransactionType(type);
  }

  function handleModalSelectCategoryModal() {
    setCategoryModalOpen(true)
  }

  function handleCloseSelectCategory() {
    setCategoryModalOpen(false)
  }

  async function handleRegister(form : IFormData){
    if(!transactionType) {
      return Alert.alert('Selecione o tipo da transação')
    }
    if(category.key === 'category') {
      return Alert.alert('Selecione a categoria')
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date()
    }

    try {
      const transactionData = await AsyncStorage.getItem(transactionKey);
      const currentData = transactionData ? JSON.parse(transactionData) : [];
      const dataFormatted = [newTransaction, ...currentData]

      await AsyncStorage.setItem(transactionKey, JSON.stringify(dataFormatted));

      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'Categoria'
      })
      reset()

      navigate('Listagem' as never)
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível salvar a transação')
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <FormView>
          <Fields>
          <InputForm
            name="name"
            control={control}
            placeholder="Nome"
            autoCapitalize="sentences"
            autoCorrect={false}
            error={errors.name && errors.name.message}
          />
          <InputForm
            name="amount"
            control={control}
            placeholder="Preço"
            keyboardType="numeric"
            error={errors.amount && errors.amount.message}
          />
          <TransactionView>
            <TransactionTypeButton
              type="up"
              title="Income"
              onPress={() => handleTransactionTypeSelect('positive')}
              isActive={transactionType === 'positive'}
              />
            <TransactionTypeButton
              type="down"
              title="Output"
              onPress={() => handleTransactionTypeSelect('negative')}
              isActive={transactionType === 'negative'}
              />
          </TransactionView>
          <CategorySelectButton title={category.name} onPress={handleModalSelectCategoryModal}/>
          </Fields>
          <Button onPress={handleSubmit(handleRegister)} title="Enviar" />
        </FormView>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategory}
          />
        </Modal>
      </Container>
  </TouchableWithoutFeedback>
    );
}

