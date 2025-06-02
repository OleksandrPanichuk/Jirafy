import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from '@heroui/react'
import { IconClock } from '@tabler/icons-react'
import { useState } from 'react'

interface MessageSchedulerProps {
    isOpen: boolean
    onClose: () => void
    onSchedule: (date: Date) => void
}

export const MessageScheduler = ({
    isOpen,
    onClose,
    onSchedule,
}: MessageSchedulerProps) => {
    const [selectedDate, setSelectedDate] = useState('')
    const [selectedTime, setSelectedTime] = useState('')

    const handleSchedule = () => {
        if (!selectedDate || !selectedTime) return

        const scheduledDate = new Date(`${selectedDate}T${selectedTime}`)
        onSchedule(scheduledDate)
        onClose()
        setSelectedDate('')
        setSelectedTime('')
    }

    const quickScheduleOptions = [
        { label: 'In 1 hour', minutes: 60 },
        {
            label: 'Tomorrow 9 AM',
            getDate: () => {
                const tomorrow = new Date()
                tomorrow.setDate(tomorrow.getDate() + 1)
                tomorrow.setHours(9, 0, 0, 0)
                return tomorrow
            },
        },
        {
            label: 'Next Monday 9 AM',
            getDate: () => {
                const nextMonday = new Date()
                const daysUntilMonday = (1 + 7 - nextMonday.getDay()) % 7 || 7
                nextMonday.setDate(nextMonday.getDate() + daysUntilMonday)
                nextMonday.setHours(9, 0, 0, 0)
                return nextMonday
            },
        },
    ]

    const handleQuickSchedule = (option: (typeof quickScheduleOptions)[0]) => {
        if ('minutes' in option && typeof option.minutes === 'number') {
            const date = new Date()
            date.setMinutes(date.getMinutes() + option.minutes)
            onSchedule(date)
        } else if ('getDate' in option) {
            onSchedule(option.getDate())
        }
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} placement="center" size="sm">
            <ModalContent>
                <ModalHeader className="flex gap-1 text-base">
                    <IconClock size={16} />
                    Schedule Message
                </ModalHeader>
                <ModalBody className="py-3">
                    <div className="space-y-3">
                        <div>
                            <h3 className="text-xs font-medium mb-2">
                                Quick Schedule
                            </h3>
                            <div className="flex flex-wrap gap-1.5">
                                {quickScheduleOptions.map((option) => (
                                    <Button
                                        key={option.label}
                                        size="sm"
                                        variant="bordered"
                                        className="text-xs h-7"
                                        onPress={() =>
                                            handleQuickSchedule(option)
                                        }
                                    >
                                        {option.label}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className="border-t pt-3">
                            <h3 className="text-xs font-medium mb-2">
                                Custom Schedule
                            </h3>
                            <div className="flex gap-2">
                                <Input
                                    type="date"
                                    label="Date"
                                    size="sm"
                                    value={selectedDate}
                                    onChange={(e) =>
                                        setSelectedDate(e.target.value)
                                    }
                                    min={new Date().toISOString().split('T')[0]}
                                    classNames={{
                                        label: 'text-xs',
                                        input: 'text-xs',
                                    }}
                                />
                                <Input
                                    type="time"
                                    label="Time"
                                    size="sm"
                                    value={selectedTime}
                                    onChange={(e) =>
                                        setSelectedTime(e.target.value)
                                    }
                                    classNames={{
                                        label: 'text-xs',
                                        input: 'text-xs',
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className="py-3">
                    <Button
                        variant="light"
                        onPress={onClose}
                        size="sm"
                        className="text-xs"
                    >
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        onPress={handleSchedule}
                        isDisabled={!selectedDate || !selectedTime}
                        size="sm"
                        className="text-xs"
                    >
                        Schedule
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
