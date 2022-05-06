const Consts = {
  typeEmail: "email",
  typePhoneNumber: "phoneNumber",
  typeMismatch: "mismatch",
  typeUsername: "username",
  typeName: "name",
  typeGender: "gender",
  typePassword: "password",
  typePasswordRepeat: "passwordRepeat",
  typeRequired: "required",
  typeDate: "date",
  typeConfirmationCode: "confirmationCode",
  typeAge: "age",
  // regexEmail: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  // regexPhoneNumber: /^[0-9]{4}[-\s\.]?[0-9]{4}$/,
  regexUsername:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$|^[0-9]{8}$/,
  regexPassword: /^(?=.*[0-9])(?=.*[a-z]).{8,}$/,
  regexDate: /^\d{4}-\d{2}-\d{2}$/,
  regexNumber: /[^\d.]/gi,
  regexImage: /((^|, )(image\/)(jpg|jpeg|png|JPG|JPEG|PNG))+$/,
  SS_UserKey: "user",
  SS_CognitoUserKey: "uc",
  SS_UserSignUp: "signUpKey",
  signInUp: "signInUp",
  signIn: "signIn",
  signUp: "signUp",
  addPostKey: "firstTime",
  loggedUserAuth: "AMAZON_COGNITO_USER_POOLS",
  publicUserAuth: "AWS_IAM",
  siteMainTitle: "Саак.мн",
  translatorUserId: [
    "a35649ba-d066-480f-b01d-f586b53af5a5",
    "f100ebec-1ae4-4d2f-abcf-3c261af96cc7",
    "c0d39895-53fd-4da6-a266-3a1959b67431",
  ],
  packages: {
    hybrid: {
      title: "Hybrid",
      price: 100000,
      type: "HYBRID",
      bonus: 20000,
      boostDays: 24,
      code: "caak100",
    },
    premium: {
      title: "Premium",
      price: 200000,
      type: "PREMIUM",
      bonus: 50000,
      boostDays: 50,
      code: "caak200"
    },
    business: {
      title: "Business",
      price: 500000,
      type: "BUSINESS",
      bonus: 100000,
      boostDays: 120,
      code: "caak500"
    }
  }
};

export default Consts;
