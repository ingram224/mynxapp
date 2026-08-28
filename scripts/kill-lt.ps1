Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -match 'localtunnel|lt\.js' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
