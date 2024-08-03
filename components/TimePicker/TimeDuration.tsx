import { useState } from 'react'
import { View, Text } from 'react-native'
import { TimerPickerModal } from 'react-native-timer-picker'
import * as Haptics from 'expo-haptics'

import { Button } from 'react-native-ui-lib'
import { lightGrey } from '@/constants/Colors'

export const formatTime = ({
  hours,
  minutes,
  seconds,
}: {
  hours?: number
  minutes?: number
  seconds?: number
}) => {
  const timeParts = []

  if (hours !== undefined) {
    timeParts.push(hours.toString().padStart(2, '0'))
  }
  if (minutes !== undefined) {
    timeParts.push(minutes.toString().padStart(2, '0'))
  }
  if (seconds !== undefined) {
    timeParts.push(seconds.toString().padStart(2, '0'))
  }

  return timeParts.join(':')
}

export default function TimeDuration() {
  const [showPicker, setShowPicker] = useState(false)
  const [timeDurationString, setTimeDurationString] = useState<string | null>(null)

  return (
    <>
      <View style={{ alignItems: 'center' }}>
        <Button
          outline
          outlineColor={lightGrey}
          label={timeDurationString === null ? 'Lesson Duration' : ''}
          borderRadius={7}
          style={{ height: 50, width: '100%', justifyContent: 'flex-start' }}
          onPress={() => setShowPicker(true)}>
          {timeDurationString !== null ? <Text>{timeDurationString}</Text> : <Text />}
        </Button>
      </View>
      <TimerPickerModal
        visible={showPicker}
        setIsVisible={setShowPicker}
        onConfirm={(pickedDuration) => {
          setTimeDurationString(formatTime(pickedDuration))
          setShowPicker(false)
        }}
        modalTitle="Lesson Duration"
        onCancel={() => setShowPicker(false)}
        closeOnOverlayPress
        Haptics={Haptics}
        styles={{
          theme: 'light',
        }}
      />
    </>
  )
}