import {IFormInput} from "./types";

export function getBlockButtonName(block: string): string {
  switch (block) {
    case 'block1':
      return 'Блок 1';
    case 'block2':
      return 'Блок 2';
    case 'block3':
      return 'Блок 3';
    default:
      return 'Кнопка';
  }
}

export function getFormInputText(input: string): IFormInput {
  switch (input) {
    case 'lname':
      return {
        label: 'Имя',
        placeholder: 'Введите имя',
      }

    case 'fname':
      return {
        label: 'Фамилия',
        placeholder: 'Введите фамилию',
      }

    case 'birthday':
      return {
        label: 'День рождения',
        placeholder: 'Введите день рождения',
      }

    case 'height':
      return {
        label: 'Рост',
        placeholder: 'Введите рост',
      }

    case 'city':
      return {
        label: 'Город',
        placeholder: 'Введите город',
      }

    case 'address':
      return {
        label: 'Улица',
        placeholder: 'Введите улица',
      }

    case 'index':
      return {
        label: 'Почтовый индекс',
        placeholder: 'Введите почтовый индекс',
      }

    default:
      return {
        label: 'Заголовок',
        placeholder: 'Введите заголовок',
      }

  }
}