import { Tasks } from "./tasks";
import { Team } from "./team";
import { User } from "./user";

export interface Project{
    id: number;
    authorId: number;
    author: User;
    teamId: number;
    team: Team;
    name: string;
    description: string;
    deadline:Date;
    createdAt: Date;
    tasks: Tasks[]
}