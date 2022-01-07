import { render,fireEvent } from "@testing-library/react";
import EmailForm from "./EmailForm";

test('check that everything is rendering propertly', async () => {
  const { getByText } = render(<EmailForm OnUserListChange={()=>{}}/>);
  const button = getByText("Accept");
  expect(button).toBeInTheDocument();
  fireEvent.click(button);
});

test('check register ok', async () => {
  const { container, getByText} = render(<EmailForm OnUserListChange={()=>{}}/>);
  const inputName = container.querySelector('input[name="username"]')!; //Exclamation means we ensure that the value is never null
  const inputEmail = container.querySelector('input[name="email"]')!;
  fireEvent.change(inputName, { target: { value: "Pablo" } });
  fireEvent.change(inputEmail, { target: { value: "gonzalezgpablo@uniovi.es" } });

  jest.mock("../api/api", () => {
    return {
      addUser: jest.fn(() => {return true})
    };
  });

  const button = getByText("Accept");
  fireEvent.click(button);
})

test('check register fail', async () => {
  const { container, getByText} = render(<EmailForm OnUserListChange={()=>{}}/>);
  const inputName = container.querySelector('input[name="username"]')!;
  const inputEmail = container.querySelector('input[name="email"]')!;
  fireEvent.change(inputName, { target: { value: "Pablo" } });
  fireEvent.change(inputEmail, { target: { value: "gonzalezgpablo@uniovi.es" } });

  jest.mock("../api/api", () => {
    return {
      addUser: jest.fn(() => {return false})
    };
  });

  const button = getByText("Accept");
  fireEvent.click(button);
})
