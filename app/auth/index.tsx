import AppButton from '@/components/Button'
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser'
import { useOAuth } from '@clerk/clerk-expo'
import { Link, router } from 'expo-router'
import * as WebBrowser from 'expo-web-browser'
import { useCallback } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

WebBrowser.maybeCompleteAuthSession()

const SignInWithOAuth = () => {
  useWarmUpBrowser()

  const { startOAuthFlow: startGoogleOAuthFlow } = useOAuth({
    strategy: 'oauth_google',
  })
  const { startOAuthFlow: startFacebookOAuthFlow } = useOAuth({
    strategy: 'oauth_facebook',
  })
  const { startOAuthFlow: startMicroSoftOAuthFlow } = useOAuth({
    strategy: 'oauth_microsoft',
  })

  const loginWithOAuth = useCallback(async (startOAuthFlow: any) => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow()

      if (createdSessionId && setActive) {
        console.log('setting active session')
        await setActive({ session: createdSessionId })
        console.log('session', createdSessionId)
        // navigate to the home screen
        router.replace('/')
      } else {
        // Use signIn or signUp for next steps such as MFA
        // await signIn();
      }
    } catch (err) {
      console.error('OAuth error', err)
    }
  }, [])

  const loginWithGoogle = () => loginWithOAuth(startGoogleOAuthFlow)
  const loginWithFacebook = () => loginWithOAuth(startFacebookOAuthFlow)
  const loginWithMicroSoft = () => loginWithOAuth(startMicroSoftOAuthFlow)

  const onPress = () => {
    router.push('/auth/sign-in')
  }

  return (
    <>
      <View className="flex flex-1 justify-center items-center px-2">
        <AppButton icon={require('../../assets/google.png')} onPress={loginWithGoogle}>
          Sign in with Google
        </AppButton>

        <AppButton icon={require('../../assets/facebook.png')} onPress={loginWithFacebook}>
          Sign in with Facebook
        </AppButton>

        <AppButton icon={require('../../assets/microsoft.png')} onPress={loginWithMicroSoft}>
          Sign in with Microsoft
        </AppButton>

        <View className="flex flex-col items-center justify-center mt-4">
          <Text className="text-gray-500">Or</Text>
          {/* TODO: Add functionality for email sign in */}
          <AppButton onPress={onPress}>Sign in with email</AppButton>
          <View className="flex flex-row justify-center items-center mt-4">
            <Text className="text-gray-500">Don't have an account?</Text>
            <TouchableOpacity>
              {/* 
              TODO: Add functionality for sign up
              */}
              <Link className="text-blue-500 ml-2" href="/auth/sign-up">
                Sign up
              </Link>
            </TouchableOpacity>
          </View>
          {/*  Terms of Service and Privacy Policy, including Cookie Use. */}
        </View>
        <View className="flex flex-row flex-wrap justify-center items-center mt-4">
          <Text className="text-gray-500">By signing in, you agree to our</Text>
          <Link className="text-blue-500 ml-2" href="/auth/terms">
            Terms of Service
          </Link>
          <Text className="text-gray-500"> and</Text>
          <Link className="text-blue-500 ml-2" href="/auth/privacy">
            Privacy Policy
          </Link>
          <Text className="text-gray-500">,including</Text>
          <Link className="text-blue-500 ml-2" href="/auth/cookie">
            Cookie Use
          </Link>
          <Text className="text-gray-500">.</Text>
        </View>
      </View>
    </>
  )
}
export default SignInWithOAuth