import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { getProfile } from "@/store/useProfileStore";
import { useCompanyStore } from "@/store/useCompanyStore";
import { Skeleton } from "@/components/ui/skeleton";
import { getBranches } from "@/store/useBranchStore";
import { getAuthorization } from "@/store/useAuthorizationStore";
import { apiClient } from "@/utils/apiClient";
import { FormWrapper } from "@/components/customFormFields/FormWrapper";
import InputFx from "@/components/customFormFields/InputFx";
import InputPasswordFx from "@/components/customFormFields/InputPasswordFx";
import { Lock, Mail } from "lucide-react";

const LoginForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const { company } = useCompanyStore();
  const navigate = useNavigate();
  const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6).max(50),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { data } = await apiClient.post<{ token: string }>(
      "auth/login",
      values,
    );
    if (!data.token) return;
    getProfile();
    getBranches();
    getAuthorization();
    localStorage.setItem("token", data.token);
    navigate("/dashboard");
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          {company ? (
            <CardTitle className="text-xl uppercase">{company.name}</CardTitle>
          ) : (
            <Skeleton className="h-8 w-full" />
          )}
          <CardDescription>
            Login with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
            <FormWrapper form={form} onSubmit={onSubmit} className="grid gap-6">
              <InputFx
                icon={<Mail size={20} />}
                name="email"
                label="Email"
                placeholder="email@gmail.com"
              />
              <InputPasswordFx
                icon={<Lock size={20} />}
                name="password"
                label="Password"
                placeholder="******"
              />
              <Button type="submit" className="w-full">
                Login
              </Button>
            </FormWrapper>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
};

export default LoginForm;
