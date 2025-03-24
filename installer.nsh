!include nsDialogs.nsh

!macro customPageAfterChangeDir
Page custom customPageCreator nsDialogsPageValidate "MySQL Database Configuration"

Var Dialog
Var HostEdit
Var UserEdit
Var PassEdit
Var DBEdit
Var Host
Var User
Var Pass
Var DBName

Function customPageCreator
    nsDialogs::Create 1018
    Pop $Dialog
    
    ${If} $Dialog == error
        Abort
    ${EndIf} 
    
    ; Host
    ${NSD_CreateLabel} 0 0 100% 12u "MySQL Host:"
    ${NSD_CreateText} 0 15u 100% 12u "localhost"
    Pop $HostEdit
    
    ; Username
    ${NSD_CreateLabel} 0 30u 100% 12u "MySQL Username:"
    ${NSD_CreateText} 0 45u 100% 12u "root"
    Pop $UserEdit
    
    ; Password
    ${NSD_CreateLabel} 0 60u 100% 12u "MySQL Password:"
    ${NSD_CreatePassword} 0 75u 100% 12u ""
    Pop $PassEdit
    
    ; Database
    ${NSD_CreateLabel} 0 90u 100% 12u "MySQL Database:"
    ${NSD_CreateText} 0 105u 100% 12u "electron_local_auth"
    Pop $DBEdit

    nsDialogs::Show
FunctionEnd


Function nsDialogsPageValidate
    ${NSD_GetText} $HostEdit $Host
    ${NSD_GetText} $UserEdit $User
    ${NSD_GetText} $PassEdit $Pass
    ${NSD_GetText} $DBEdit $DBName
    
    ${If} $Host == ""
        MessageBox MB_ICONEXCLAMATION "Please enter MySQL host"
        Abort
    ${EndIf}
    
    ${If} $User == ""
        MessageBox MB_ICONEXCLAMATION "Please enter MySQL username"
        Abort
    ${EndIf}
    
    ${If} $DBName == ""
        MessageBox MB_ICONEXCLAMATION "Please enter database name"
        Abort
    ${EndIf}
FunctionEnd

Section "Install"
    CreateDirectory "$INSTDIR"
    
    ; Write to INI file using the stored variables
    WriteIniStr "$INSTDIR\db_config.ini" "Database" "host" "$Host"
    WriteIniStr "$INSTDIR\db_config.ini" "Database" "username" "$User"
    WriteIniStr "$INSTDIR\db_config.ini" "Database" "password" "$Pass"
    WriteIniStr "$INSTDIR\db_config.ini" "Database" "dbname" "$DBName"
    
    ; Verify the file was created
    IfFileExists "$INSTDIR\db_config.ini" +3 0
    MessageBox MB_ICONEXCLAMATION "Failed to create db_config.ini"
    Abort
    
    ; Add your application files here
    SetOutPath "$INSTDIR"
    ; File "your_app_files\*.*"
SectionEnd


!macroend