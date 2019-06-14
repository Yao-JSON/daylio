interface IPhoneNumberProps {
  getPhoneNumber: (val) => void;
}


Page<IPhoneNumberProps, IPhoneNumberProps>({
  getPhoneNumber: (e) => {
    console.log(e);
  }
})