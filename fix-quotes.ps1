# Fix unescaped quotes and apostrophes in React files
Write-Host "Fixing unescaped entities in React files..." -ForegroundColor Green

# Get all TSX files in the src directory
$files = Get-ChildItem -Path "src" -Recurse -Include "*.tsx" -File

foreach ($file in $files) {
    Write-Host "Processing: $($file.Name)" -ForegroundColor Yellow
    
    # Read file content
    $content = Get-Content $file.FullName -Raw
    
    # Skip if file is empty
    if (-not $content) { continue }
    
    # Track changes
    $originalContent = $content
    
    # Fix common unescaped apostrophes in contractions
    $content = $content -replace "don't", "don&apos;t"
    $content = $content -replace "doesn't", "doesn&apos;t"
    $content = $content -replace "won't", "won&apos;t"
    $content = $content -replace "can't", "can&apos;t"
    $content = $content -replace "isn't", "isn&apos;t"
    $content = $content -replace "aren't", "aren&apos;t"
    $content = $content -replace "wasn't", "wasn&apos;t"
    $content = $content -replace "weren't", "weren&apos;t"
    $content = $content -replace "Let's", "Let&apos;s"
    $content = $content -replace "We'll", "We&apos;ll"
    $content = $content -replace "You'll", "You&apos;ll"
    $content = $content -replace "I'll", "I&apos;ll"
    $content = $content -replace "It's", "It&apos;s"
    $content = $content -replace "That's", "That&apos;s"
    $content = $content -replace "What's", "What&apos;s"
    $content = $content -replace "Here's", "Here&apos;s"
    $content = $content -replace "There's", "There&apos;s"
    
    # Write back to file if changes were made
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "  Fixed quotes in $($file.Name)" -ForegroundColor Green
    } else {
        Write-Host "  No changes needed in $($file.Name)" -ForegroundColor Gray
    }
}

Write-Host "Quote fixing completed!" -ForegroundColor Green