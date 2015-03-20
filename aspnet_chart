Public Class Chart

    Private Sub Chart_Load(sender As Object, e As EventArgs) Handles MyBase.Load
        Dim dtLine As DataTable = New DataTable
        Dim dtColumn As DataTable = New DataTable

        'S1、S2是曲線
        'S3、S4、S5是長條
        dtLine.Columns.Add("ColName")
        dtLine.Columns.Add("ColValA")
        dtLine.Columns.Add("ColValB")
        dtLine.Columns.Add("ColValC")
        dtLine.Columns.Add("ColValD")
        dtLine.Columns.Add("ColValE")

        '隨便給數值x2
        Dim yValuesLine() As Integer = {10, 14, 12, 13, 15, 10, 14, 12, 13, 15, 10, 14, 12, 13, 15}
        Dim yValuesCol() As Integer = {3, 7, 5, 2, 9, 3, 7, 5, 2, 9, 3, 7, 5, 2, 9, 3, 7, 5, 2, 9}

        For i As Integer = 0 To 10
            Dim row As DataRow = dtLine.NewRow
            row("ColName") = String.Format("第{0}組", i)
            row("ColValA") = yValuesLine(i)
            row("ColValB") = yValuesLine(i) / (i + 1)
            row("ColValC") = yValuesCol(i)
            row("ColValD") = yValuesCol(i Mod 4) + 1
            row("ColValE") = yValuesCol(i) + (i Mod 3)
            dtLine.Rows.Add(row)

            '長條圖
            Chart1.Series("S3").Points.AddY(CType(row("ColValC"), Integer))
            Chart1.Series("S4").Points.AddY(CType(row("ColValD"), Integer))
            Chart1.Series("S5").Points.AddY(CType(row("ColValE"), Integer))
        Next

        '折線圖
        Chart1.DataSource = dtLine
        Chart1.Series("S1").XValueMember = "ColName"
        Chart1.Series("S2").XValueMember = "ColName"
        Chart1.Series("S1").YValueMembers = "ColValA"
        Chart1.Series("S2").YValueMembers = "ColValB"
        Chart1.DataBind()


    End Sub


End Class
