import { View } from 'react-native'
import TextInputField from '@/components/forms/LessonPlan/TextInputField'
import TimeDuration from '@/components/TimePicker/TimeDuration'
import { LessonData } from './LessonPlan'
import DateTime from '@/components/DateTimePicker/DateTime'

interface LessonDetailsProps {
  lessonData: LessonData
  updateLessonData: (newData: Partial<LessonData>) => void
}
const LessonDetails: React.FC<LessonDetailsProps> = ({ lessonData, updateLessonData }) => {
  return (
    <View style={{ gap: 20 }}>
      <TextInputField
        setTextValue={lessonData.title}
        onInputChange={(text: string) => updateLessonData({ title: text })}
        placeholder="Lesson Title"
      />
      <TextInputField
        setTextValue={lessonData.description}
        onInputChange={(text: string) => updateLessonData({ description: text })}
        placeholder="Lesson Description"
      />
      <TextInputField
        setTextValue={lessonData.class}
        onInputChange={(text: string) => updateLessonData({ class: text })}
        placeholder="Class"
      />
      <TextInputField
        setTextValue={lessonData.subject}
        onInputChange={(text: string) => updateLessonData({ subject: text })}
        placeholder="Subject"
      />
      <TimeDuration
        setTextValue={lessonData.duration}
        onInputChange={(text: string) => updateLessonData({ duration: text })}
      />
      <DateTime
        setDateValue={lessonData.date}
        onInputChange={(date: Date) => updateLessonData({ date: date })}
      />
    </View>
  )
}

export default LessonDetails
