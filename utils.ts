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

    default:
      return {
        label: 'Заголовок',
        placeholder: 'Введите заголовок',
      }

  }
}