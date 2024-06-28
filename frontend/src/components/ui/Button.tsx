type ButtonProps = {
  el: 'button';
}

type AnchorProps = {
  el: 'anchor';
}

export default function Button(props: ButtonProps | AnchorProps) {
  if (props.el === "anchor") {
    return <></>
  }
  // return (<button {...props}></button>)
}
