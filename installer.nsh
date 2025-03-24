!include "MUI2.nsh"
!include "nsDialogs.nsh"
!include "LogicLib.nsh"

OutFile "NeuroClock-Auth-Setup.exe"

InstallDir "$PROGRAMFILES\NeuroClock-Auth"

RequestExecutionLevel admin ; Add this for Windows Vista+ compatibility

Page custom MySQLCredentialsPage CreateMySQLCredentials
Page instfiles

Var Dialog
Var HostEdit
Var UserEdit
Var PassEdit
Var DBEdit

Function MySQLCredentialsPage
FunctionEnd

Function CreateMySQLCredentials
    nsDialogs::Create 1018
    Pop $Dialog
    
    ${If} $Dialog == error
        Abort
    ${EndIf}
    
    ; Host
    ${NSD_CreateLabel} 0 0 100% 12u "MySQL Host:"
    ${NSD_CreateText} 0 15u 100% 12u ""
    Pop $HostEdit
    
    ; Username
    ${NSD_CreateLabel} 0 30u 100% 12u "MySQL Username:"
    ${NSD_CreateText} 0 45u 100% 12u ""
    Pop $UserEdit
    
    ; Password
    ${NSD_CreateLabel} 0 60u 100% 12u "MySQL Password:"
    ${NSD_CreatePassword} 0 75u 100% 12u ""
    Pop $PassEdit
    
    ; Database
    ${NSD_CreateLabel} 0 90u 100% 12u "MySQL Database:"
    ${NSD_CreateText} 0 105u 100% 12u ""
    Pop $DBEdit
    
    nsDialogs::Show
FunctionEnd

Section "Install"
    CreateDirectory "$INSTDIR"
    
    ; Get values from dialog
    ${NSD_GetText} $HostEdit $0
    ${NSD_GetText} $UserEdit $1
    ${NSD_GetText} $PassEdit $2
    ${NSD_GetText} $DBEdit $3
    
    ; Write to INI file
    WriteIniStr "$INSTDIR\db_config.ini" "Database" "host" "$0"
    WriteIniStr "$INSTDIR\db_config.ini" "Database" "username" "$1"
    WriteIniStr "$INSTDIR\db_config.ini" "Database" "password" "$2"
    WriteIniStr "$INSTDIR\db_config.ini" "Database" "dbname" "$3"
    
    ; Add your other installation files and operations here
SectionEnd