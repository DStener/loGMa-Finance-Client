
call npm run build

cd ..

xcopy /Y /E /I .\loGMa-Finance-Client\dist\* .\loGMa-Finance-Server\root\

call .\loGMa-Finance-Server\run.bat