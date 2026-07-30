# Fix specific apostrophes in React files
$replacements = @{
    "We're" = "We&apos;re"
    "don't" = "don&apos;t"
    "We've" = "We&apos;ve" 
    "didn't" = "didn&apos;t"
    "Let's" = "Let&apos;s"
    "We'd" = "We&apos;d"
}

# Get all TSX files
$files = Get-ChildItem -Path "src" -Recurse -Include "*.tsx" -File

foreach ($file in $files) {
    $content = Get-Content $file.FullName
    $originalContent = $content -join "`n"
    $newContent = $originalContent
    
    # Apply replacements
    foreach ($pair in $replacements.GetEnumerator()) {
        $newContent = $newContent -replace [regex]::Escape($pair.Key), $pair.Value
    }
    
    # Write back if changes were made
    if ($newContent -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $newContent
        Write-Host "Fixed apostrophes in: $($file.Name)" -ForegroundColor Green
    }
}

Write-Host "Apostrophe fixing completed!" -ForegroundColor Green