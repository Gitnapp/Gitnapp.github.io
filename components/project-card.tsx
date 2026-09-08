import Image from "next/image";

import { Badge } from "@gitnapp/ui/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@gitnapp/ui/components/ui/card";

import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { readonly project: Project }) {
  return (
    <Card className="gap-0 overflow-hidden py-0">
      <a href={project.href} target="_blank" rel="noreferrer" className="block">
        <Image
          src={project.cover}
          alt=""
          placeholder="blur"
          sizes="(min-width: 768px) 50vw, 100vw"
          className="w-full border-b bg-muted object-cover"
        />
      </a>
      <CardHeader className="gap-1.5 pt-5">
        <div className="text-micro text-muted-foreground uppercase">{project.kind}</div>
        <CardTitle className="text-lg">
          <a className="hover:underline" href={project.href} target="_blank" rel="noreferrer">
            {project.name}
          </a>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{project.summary}</p>
      </CardHeader>
      <CardContent className="flex flex-wrap items-center gap-1.5 pt-4 pb-5">
        {project.stack.map((item) => (
          <Badge key={item} variant="secondary">
            {item}
          </Badge>
        ))}
        {project.demo ? (
          <Badge asChild variant="outline" className="ml-auto">
            <a href={project.demo} target="_blank" rel="noreferrer">
              Live demo
            </a>
          </Badge>
        ) : null}
      </CardContent>
    </Card>
  );
}
