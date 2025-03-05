export interface ButtonColorSet {
  textColor?: string;
  backgroundColor: string;
  hoverColor: string;
  bold?: boolean;
}

export const blueColorSet: ButtonColorSet = {
  textColor: '#fff',
  backgroundColor: '#007bff',
  hoverColor: '#0056b3',
  bold: true,
};

export const redColorSet: ButtonColorSet = {
  textColor: '#721c24',
  backgroundColor: '#f8d7da',
  hoverColor: '#f1b0b7',
  bold: false,
};
