import { toast } from "sonner";

const success = ({ content }: { content: string }) => {
  toast.success("Success", {
    description: content,
  });
};

const error = ({ content }: { content: string }) => {
  toast.error("Error occured", {
    description: content,
  });
};

export default {
  success,
  error,
};
