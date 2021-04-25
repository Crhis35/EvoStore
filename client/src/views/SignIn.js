import { useSkin } from '@hooks/useSkin'
import { Link, Redirect } from 'react-router-dom'
import { Facebook, Twitter, Mail, GitHub } from 'react-feather'
import InputPasswordToggle from '@components/input-password-toggle'
import { Formik } from 'formik'
import * as Yup from 'yup'
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  FormGroup,
  Label,
  Input,
  CustomInput,
  Button
} from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import { useQuery, gql, useLazyQuery, useMutation } from '@apollo/client'
import SpinnerComponent from '../@core/components/spinner/Fallback-spinner'
import { toast } from 'react-toastify'

const SIGN_UP = gql`
  mutation signUp($input: AuthProviderInput!) {
    signUp(input: $input) {
      token
      auth {
        __typename
        email
        id
        verifiedCode
        userId {
          name
        }
      }
    }
  }
`

const SignUp = () => {
  const [skin, setSkin] = useSkin()
  const [signUp, { data, loading, error }] = useMutation(SIGN_UP, {
    onError: (error) => {
      toast.error(error.message)
    }
  })
  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default
  if (loading) return <SpinnerComponent />
  return (
    <div className="auth-wrapper auth-v2">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/">
          <svg viewBox="0 0 139 95" version="1.1" height="28">
            <defs>
              <linearGradient
                x1="100%"
                y1="10.5120544%"
                x2="50%"
                y2="89.4879456%"
                id="linearGradient-1"
              >
                <stop stopColor="#000000" offset="0%"></stop>
                <stop stopColor="#FFFFFF" offset="100%"></stop>
              </linearGradient>
              <linearGradient
                x1="64.0437835%"
                y1="46.3276743%"
                x2="37.373316%"
                y2="100%"
                id="linearGradient-2"
              >
                <stop stopColor="#EEEEEE" stopOpacity="0" offset="0%"></stop>
                <stop stopColor="#FFFFFF" offset="100%"></stop>
              </linearGradient>
            </defs>
            <g
              id="Page-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g id="Artboard" transform="translate(-400.000000, -178.000000)">
                <g id="Group" transform="translate(400.000000, 178.000000)">
                  <path
                    d="M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z"
                    id="Path"
                    className="text-primary"
                    style={{ fill: 'currentColor' }}
                  ></path>
                  <path
                    d="M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z"
                    id="Path"
                    fill="url(#linearGradient-1)"
                    opacity="0.2"
                  ></path>
                  <polygon
                    id="Path-2"
                    fill="#000000"
                    opacity="0.049999997"
                    points="69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325"
                  ></polygon>
                  <polygon
                    id="Path-2"
                    fill="#000000"
                    opacity="0.099999994"
                    points="69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338"
                  ></polygon>
                  <polygon
                    id="Path-3"
                    fill="url(#linearGradient-2)"
                    opacity="0.099999994"
                    points="101.428699 0 83.0667527 94.1480575 130.378721 47.0740288"
                  ></polygon>
                </g>
              </g>
            </g>
          </svg>
          <h2 className="brand-text text-primary ml-1">EvoStore</h2>
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login V2" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="font-weight-bold mb-1">
              Welcome to EvoStore! 👋
            </CardTitle>
            <CardText className="mb-2">
              Please sign-in to your account and start the adventure
            </CardText>
            <Formik
              initialValues={{
                userName: '',
                email: '',
                password: ''
              }}
              validationSchema={Yup.object({
                email: Yup.string().email().required(),
                userName: Yup.string().required(),
                password: Yup.string().min(8).required()
              })}
              onSubmit={async (values) => {
                try {
                  signUp({
                    variables: {
                      input: { ...values, provider: 'Email' }
                    }
                  })
                  if (data?.data.login.verified) {
                    toast.info('You are not verified!')
                  }
                } catch (error) {
                  console.log(error)
                }
              }}
            >
              {({
                values,
                handleSubmit,
                handleChange,
                handleBlur,
                errors,
                touched
              }) => (
                <Form className="auth-login-form mt-2" onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label className="form-label" for="login-email">
                      User name
                    </Label>
                    <Input
                      type="text"
                      id="userName"
                      name="userName"
                      value={values.userName}
                      placeholder="john35"
                      invalid={errors.userName && touched.userName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label className="form-label" for="login-email">
                      Email
                    </Label>
                    <Input
                      type="email"
                      id="login-email"
                      name="email"
                      value={values.email}
                      placeholder="john@example.com"
                      invalid={errors.email && touched.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormGroup>
                  <FormGroup>
                    <div className="d-flex justify-content-between">
                      <Label className="form-label" for="login-password">
                        Password
                      </Label>
                      <Link to="/">
                        <small>Forgot Password?</small>
                      </Link>
                    </div>
                    <InputPasswordToggle
                      className="input-group-merge"
                      id="login-password"
                      name="password"
                      value={values.password}
                      invalid={errors.password && touched.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormGroup>
                  <FormGroup>
                    <CustomInput
                      type="checkbox"
                      className="custom-control-Primary"
                      id="remember-me"
                      label="Remember Me"
                    />
                  </FormGroup>
                  <Button.Ripple type="submit" color="primary" block>
                    Sign in
                  </Button.Ripple>
                </Form>
              )}
            </Formik>
            <p className="text-center mt-2">
              <span className="mr-25">Already have an account?</span>
              <Link to="/login">
                <span>Login</span>
              </Link>
            </p>
            <div className="divider my-2">
              <div className="divider-text">or</div>
            </div>
            <div className="auth-footer-btn d-flex justify-content-center">
              <Button.Ripple color="facebook">
                <Facebook size={14} />
              </Button.Ripple>
              <Button.Ripple color="twitter">
                <Twitter size={14} />
              </Button.Ripple>
              <Button.Ripple color="google">
                <Mail size={14} />
              </Button.Ripple>
              <Button.Ripple className="mr-0" color="github">
                <GitHub size={14} />
              </Button.Ripple>
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default SignUp
