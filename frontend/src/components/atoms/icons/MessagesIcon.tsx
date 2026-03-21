import { MessageSquareText } from "lucide-react";

type Props = {
    className?: string;
}

export const MessagesIcon = ({ className }: Props) => (
    <MessageSquareText className={className ?? "w-4 h-4 text-second-admin"}/>
)