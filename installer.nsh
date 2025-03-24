!include nsDialogs.nsh

!macro customPageAfterChangeDir
Page custom customPageCreator customPageLeave "Custom page caption"

Var Dialog

Function customPageCreator
    nsDialogs::Create 1018
    Pop $Dialog
    
    ${If} $Dialog == error
        Abort
    ${EndIf} 
    
    MessageBox MB_OK "customPageCreator"

    nsDialogs::Show
FunctionEnd

Function customPageLeave
    MessageBox MB_OK "customPageLeave"
FunctionEnd
!macroend