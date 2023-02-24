declare module "react-copy-to-clipboard" {
  interface CopyToClipboardProps {
    text: string;
    children: JSX.Element;
  }
  function CopyToClipboard(props: CopyToClipboardProps): JSX.Element;
  export { CopyToClipboard };
}
