import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";

import { Mail } from "lucide-react";

export function AuthPage() {
  const [listName, setListName] = useState("");
  const [email, setEmail] = useState("");
  const [shareCode, setShareCode] = useState("");
  const [listEmail, setListEmail] = useState("");
  const [isLoading, setIsLoading] = useState(Boolean);
  const navigate = useNavigate();

  async function handleCreateList() {
    try {
      const response = await axios.post(
        "https://listin-server-production.up.railway.app/api/create-list",
        {
          name: listName,
          creatorEmail: email,
        }
      );
      navigate(`/lists/${response.data._id}`);
    } catch (error) {
      console.error("Error creating list:", error);
    }
  }

  async function handleAccessList() {
    try {
      setIsLoading(true);
      const codeList = shareCode;
      navigate(`/lists/${codeList}`);
    } catch (error) {
      console.error("Error accessing list:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAccessListWithEmail() {
    try {
      setIsLoading(true);
      const emailList = listEmail;
      const response = await axios.get(
        "https://listin-server-production.up.railway.app/api/lists"
      );
      const foundlist = await response.data.find(
        (list: { creatorEmail: string }) => list.creatorEmail === emailList
      );
      if (!foundlist) {
        alert("List not found");
      } else {
        navigate(`/lists/${foundlist._id}`);
      }
    } catch (error) {
      console.error("Error acessing list with email", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-dvh max-h-screen flex flex-col items-center justify-center px-8">
      <div className="w-full mb-6 flex flex-col items-center">
        <h1 className="text-indigo-800 text-5xl font-medium py-3">
          list<span className="text-slate-400 ">In</span>
        </h1>
        <p className="text-xl text-slate-400">Shared shopping list</p>
      </div>
      <Tabs defaultValue="new-list" className="w-full">
        <TabsList className="grid w-full grid-cols-2 rounded-full bg-indigo-950 mb-6">
          <TabsTrigger value="new-list" className="rounded-full">
            New list
          </TabsTrigger>
          <TabsTrigger value="list-code" className="rounded-full">
          I already have a list
          </TabsTrigger>
        </TabsList>
        <TabsContent value="new-list">
          <Card className="border-indigo-800 bg-transparent text-slate-300">
            <CardHeader>
              <CardTitle className="text-2xl">Create a new list</CardTitle>
              <CardDescription className="text-slate-400">
                Create your shopping list and share
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    id="list-name"
                    type="text"
                    placeholder="Add a list name"
                    onChange={(e) => setListName(e.target.value)}
                    className="border-b border-indigo-800 bg-transparent font-medium text-slate-300 text-xl"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                    className="border rounded pl-10 text-lg"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleCreateList} className="w-full rounded">
                Create a new list
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="list-code">
          <Card className="border-indigo-800 bg-transparent text-slate-300">
            <CardHeader>
              <CardTitle className="text-2xl">Enter with a list code</CardTitle>
              <CardDescription className="text-slate-400">
                If you already have a list code, you can access it directly.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <Label htmlFor="shared-code" className="text-gray-300">
                  List code
                </Label>
                <Input
                  id="shared-code"
                  type="text"
                  placeholder="671fd4a227..."
                  value={shareCode}
                  onChange={(e) => setShareCode(e.target.value)}
                  className="border rounded text-lg"
                />

                <div className="w-full flex items-center justify-center space-x-2">
                  <span className="h-px w-full bg-slate-600"></span>
                  <p className="text-slate-400 font-medium whitespace-nowrap">
                    Or continue with email
                  </p>
                  <span className="h-px w-full bg-slate-600"></span>
                </div>
                <div className="space-y-2">
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <Input
                    id="list-email"
                    type="email"
                    placeholder="email@example.com"
                    onChange={(e) => setListEmail(e.target.value)}
                    className="border rounded pl-10 text-lg"
                  />
                </div>
              </div>
              </div>
            </CardContent>
            <CardFooter>
              {isLoading ? (
                <div>loading...</div>
              ) : (
                <Button
                  onClick={() => {
                    if (shareCode) {
                      handleAccessList();
                    } else if (listEmail) {
                      handleAccessListWithEmail();
                    } else {
                      alert("Please provide either a list code or an email");
                    }
                  }}
                  className="w-full rounded"
                >
                  Continue
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
