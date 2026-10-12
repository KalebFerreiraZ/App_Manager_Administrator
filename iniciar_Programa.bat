@echo off
setlocal
cd /d "%~dp0"

rem ===== 1. Verifica se o Node.js esta instalado =====
where node >nul 2>&1
if %errorlevel% neq 0 goto instalar_node
goto verificar_deps

:instalar_node
echo Node.js nao encontrado. Iniciando instalacao...
echo.
where winget >nul 2>&1
if %errorlevel% neq 0 goto node_manual

winget install -e --id OpenJS.NodeJS.LTS --accept-package-agreements --accept-source-agreements
set "PATH=%PATH%;%ProgramFiles%\nodejs"

where node >nul 2>&1
if %errorlevel% neq 0 goto node_reiniciar
echo.
echo Node.js instalado com sucesso.
goto verificar_deps

:node_manual
echo O instalador automatico (winget) nao esta disponivel neste computador.
echo Vou abrir a pagina de download do Node.js.
echo Instale a versao LTS e depois execute este arquivo novamente.
start https://nodejs.org/en/download
pause
exit /b 1

:node_reiniciar
echo.
echo Node.js foi instalado, mas o Windows ainda nao o reconheceu.
echo Feche esta janela e abra o iniciar.bat novamente.
pause
exit /b 0

rem ===== 2. Instala as dependencias se ainda nao existirem =====
:verificar_deps
if not exist "backend\node_modules" (
  echo Instalando dependencias do backend...
  pushd backend
  call npm install
  popd
)
if not exist "frontend\node_modules" (
  echo Instalando dependencias do frontend...
  pushd frontend
  call npm install
  popd
)

rem ===== 3. Inicia os servidores =====
start "Backend" cmd /k "cd backend && npm start"
start "Frontend" cmd /k "cd frontend && npm run dev"

timeout /t 8 /nobreak >nul
start http://localhost:5173
