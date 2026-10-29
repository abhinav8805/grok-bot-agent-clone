import type { MessageType } from '@/type/Message';
import RoutineCard from './RoutineCard';
import ToolSuggestionCard from './ToolSuggestionCard';

type AgentResponseViewProps = {
  message: MessageType
  agentId: string
  onSuggestedReply?: (value: string) => void
  onWorkflowResult?: (result: { response: MessageType["response"], toolCards?: MessageType["toolCards"] }) => void
  onRoutineSaved?: (routineId?: string) => void
}


export function AgentResponseView({
  message,
  agentId,
  onSuggestedReply,
  onWorkflowResult,
  onRoutineSaved,
}: AgentResponseViewProps) {
  
  const response = message.response;

  if (!response)
    return <p>{message.content}</p>;

  return (
    <div className="space-y-3">
      <p>{response.message}</p>

      {response.type === 'clarification' &&
        response.questions.map((item) => (
          <p key={item.id}>{item.question}</p>
        ))}



      {response.type === 'routine' && response.routine && (
        <RoutineCard
          routine={response.routine}
          toolCards={message.toolCards ?? []}
        />
      )}
    </div>
  );
}
