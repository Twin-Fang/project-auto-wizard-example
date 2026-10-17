// Welcome shown in each new Codespaces terminal (added to ~/.bashrc by .devcontainer/devcontainer.json)
import { bold, cyan, dim } from "./terminal.mjs";

console.log(`
${bold("project-auto-wizard example")}  ${dim("(guide: TRY-IT.md)")}

  ${cyan("npm run try:install")}   Run the real installer on a sample project (2 min)
                        설치 마법사를 샘플 프로젝트에 실행 (2분)
  ${cyan("npm run try:release")}   Cut a real release in your copy of this repo (5 min)
                        내 복사본 레포에서 실제 릴리스 (5분)
`);
