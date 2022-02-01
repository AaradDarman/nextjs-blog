import { createGlobalStyle } from "styled-components";
import { darken, lighten, rgba } from "polished";
export const GlobalStyles = createGlobalStyle`
body {
    background: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.text};
    font-family: "BYekan", Arial, sans-serif;
    transition: all 0.5s linear;
    caret-color: ${({ theme }) => theme.accent};
    line-height: 1.5;
  }

  ::-moz-selection {
    color: ${({ theme }) => theme.secondary};
    background: ${({ theme }) => theme.accent};
  }
  ::selection {
    color: ${({ theme }) => theme.secondary};
    background: ${({ theme }) => theme.accent};
  }

  @media (min-width: 500px) {
    ::-webkit-scrollbar {
      width: 20px;
    }
    ::-webkit-scrollbar-track {
      background-color: ${({ theme }) => theme.primary};
    }
    ::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => lighten(0.08, theme.primary)};
      border-radius: 0;
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: ${({ theme }) => lighten(0.1, theme.primary)};
    }
  }

  .ltr {
    direction: ltr;
  }

  button:focus {
    outline: none;
  }

  #header.float-header {
    box-shadow: 0 2px 12px -4px rgb(0 0 0 / 30%);
  }
  #header.float-header .dark-layer {
    background: ${({ theme }) => theme.primary};
  }
  #header.float-header .dark-layer nav ul {
    color: ${({ theme }) => theme.text};
  }
  #header.float-header a.dropdowwn-toggle:hover::after {
    background-color: ${({ theme }) => theme.accent};
  }
  #header.float-header a.dropdowwn-toggle::after {
    background-color: ${({ theme }) => theme.text};
  }

  .bp3-input {
    background-color: ${({ theme }) => theme.primary};
  }
  .bp3-input {
    color: ${({ theme }) => theme.text};
    border: 1px solid ${({ theme }) => theme.secondary};
    border-radius: 2px;
  }
  .bp3-input:disabled {
    background-color:inherit;
    cursor: default;
  }
  .bp3-input:focus {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.accent},
      0 0 0 3px rgb(120 94 36 / 30%), inset 0 1px 1px rgb(120 94 36 / 20%);
  }
  .bp3-input::placeholder {
    color: #5c7080;
    font-size: 0.8rem;
  }
  .bp3-input-action {
    height: 100%;
    direction: ltr;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.3rem;
    font-size: 1rem;
  }
  .bp3-form-group label.bp3-label {
    margin-bottom: 10px;
  }
  .bp3-form-group .bp3-form-helper-text,
  .bp3-label .bp3-text-muted {
    color: #db3737;
  }
  .bp3-form-helper-text {
    color: #db3737;
  }
  
  .m-btn {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    font-size: 14px;
    justify-content: center;
    padding: 5px 10px;
    text-align: left;
    vertical-align: middle;
    min-height: 30px;
    min-width: 30px;
    background-color: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.text};
    box-shadow: 0 0 0 1px rgb(16 22 26 / 40%);
    background-image: none;
    transition: all 0.3s ease;
  }
  .m-btn-cancel {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    border-radius: 3px;
    cursor: pointer;
    font-size: 14px;
    justify-content: center;
    padding: 5px 10px;
    text-align: left;
    vertical-align: middle;
    min-height: 30px;
    min-width: 30px;
    background-color: transparent;
    border: 1px solid #606262;
    color: #606262;
    box-shadow: 0 0 0 1px rgb(16 22 26 / 40%);
    background-image: none;
    transition: all 0.3s ease;
  }
  .m-btn,
  .m-btn-cancel {
    flex: 1;
  }
  .m-btn:hover {
    background-color: ${({ theme }) => darken(0.1, theme.accent)};
  }
  .m-btn-cancel:hover {
    background-color: transparent;
  }
  .danger {
    box-shadow: 0 0 0 0 rgb(219 55 55 / 0%), 0 0 0 0 rgb(219 55 55 / 0%),
      inset 0 0 0 1px #db3737, inset 0 0 0 1px rgb(16 22 26 / 15%),
      inset 0 1px 1px rgb(16 22 26 / 20%);
  }
  .success {
    box-shadow: 0 0 0 1px #0f9960, 0 0 0 3px rgb(15 153 96 / 30%),
      inset 0 1px 1px rgb(16 22 26 / 20%);
  }.bp3-popover2 .bp3-popover2-content{
    background:${({ theme }) => theme.primary};
    color:${({ theme }) => theme.text};
    margin-top: 2rem;
  }
  .actions-menu-popover{
    background:${({ theme }) => theme.primary};
    border:1px solid ${({ theme }) => theme.secondary};
    color:${({ theme }) => theme.text};
  }
  .actions-menu-popover .bp3-popover2-content{
      margin-top: 0;
    }
  .bp3-popover2 {
    box-shadow: none;
  }
  .bp3-overlay-backdrop.bp3-popover2-backdrop {
    background: rgba(0, 0, 0, 0.8);
  }
  .loading-spinner-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(41,49,51,0.5);
    z-index: 999;
  }
  .loading-spinner-modal{
    position: absolute;
    width: 100%;
  }
  .Toastify__toast-body {
    font-family: 'BYekan';
    text-align:right;
  }
  .pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  background:${({ theme }) => theme.primary};
  width:35px;
  height:35px;
  padding: 0;
  margin-right: 5px;
  border-radius: 100%;
}
.link {
  color: inherit;
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.active-page{
  background:${({ theme }) => theme.accent};
}
.link:hover {
  text-decoration: none;
  color: inherit;
}
  `;
